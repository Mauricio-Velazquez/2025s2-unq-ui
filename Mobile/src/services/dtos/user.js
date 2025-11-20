export class RegisterUserDTO {
  constructor ({ name, email, password, image }) {
    this.name = name
    this.email = email
    this.password = password
    this.image = image
  }
}

export class LoginUserDTO {
  constructor ({ email, password }) {
    this.email = email
    this.password = password
  }
}
