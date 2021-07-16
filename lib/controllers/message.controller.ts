import { Request, Response } from "express";
import { Message, MessageInterface } from "../models/message/message.model";
import { Text } from "../models/message/text.model";
import { Op } from "sequelize";
import { Image } from "../models/message/image.model";
import { Video } from "../models/message/video.model";

export class MessageController {
  public sendMessage(req: Request, res: Response) {
    // TODO: Verify that sender and recipient exist
    const params: MessageInterface = req.body;
    params.contentType = req.body.content.type;
    Message.create<Message>(params)
      .then((message: Message) => {
        switch (req.body.content.type) {
          case "text":
            Text.create<Text>({
              type: req.body.content.type,
              text: req.body.content.text,
              MessageId: message.id,
            });
            break;
          case "image":
            Image.create<Image>({
              type: req.body.content.type,
              url: req.body.content.url,
              height: req.body.content.height,
              width: req.body.content.width,
              MessageId: message.id,
            });
            break;
          case "video":
            Video.create<Video>({
              type: req.body.content.type,
              url: req.body.content.url,
              source: req.body.content.source,
              MessageId: message.id,
            });
            break;
          default:
            res.status(500).json({ error: "Unknown content" });
            break;
        }
        res.status(201).json({ id: message.id, timestamp: message.createdAt });
      })
      .catch((err: Error) => res.status(500).json(err));
  }

  public getMessages(req: Request, res: Response) {
    // TODO: Add validations for received params
    const recipient: string = req.query.recipient.toString();
    const start: number = parseInt(req.query.start.toString());
    let limit: number;
    try {
      limit = parseInt(req.query.limit.toString());
    } catch (error) {
      limit = parseInt(process.env.MSG_LIMIT);
    }

    Message.findAll<Message>({
      include: [Text, Image, Video],
      where: {
        recipient: recipient,
        id: { [Op.gt]: start },
      },
      limit: limit,
    })
      .then((messages: Array<Message> | null) => {
        if (messages) {
          let content;
          const response = messages.map((msg) => {
            switch (msg.contentType) {
              case "text":
                content = { type: msg.Text.type, text: msg.Text.text };
                break;
              case "image":
                content = {
                  type: msg.Image.type,
                  url: msg.Image.url,
                  height: msg.Image.height,
                  width: msg.Image.width,
                };
                break;
              case "video":
                content = {
                  type: msg.Video.type,
                  url: msg.Video.url,
                  source: msg.Video.source,
                };
                break;
              default:
                break;
            }
            return {
              id: msg.id,
              timestamp: msg.createdAt,
              sender: msg.sender,
              recipient: msg.recipient,
              content: content,
            };
          });
          res.json({ messages: response });
        } else {
          res.status(404).json({ error: "No messages" });
        }
      })
      .catch((err: Error) => res.status(500).json(err));
  }
}
