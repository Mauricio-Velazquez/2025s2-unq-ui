export function getUserFromReq (req) {
  const token = getTokenFromReq(req)
  const user = this.system.getUser(token.id)
  return user
}

export function getTokenFromReq (req) {

}
