export class PostDTO {
  constructor ({ image, description }) {
    this.image = image
    this.description = description
  }
}

export class CommentDTO {
  constructor ({ body }) {
    this.body = body
  }
}
