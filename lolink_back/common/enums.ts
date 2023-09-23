export enum UserRating {
  UNRANKED = 'UNRANKED',
  IRON = 'IRON',
  BRONZE = 'BRONZE',
  SILVER = 'SILVER',
  GOLD = 'GOLD',
  PLATINUM = 'PLATINUM',
  DIAMOND = 'DIAMOND',
  MASTER = 'MASTER',
  GRANDMASTER = 'GRANDMASTER',
}

export enum UserRole {
  USER = '활성 유저',
  TEMP = '임시 유저', // 구글, 네이버 로그인으로 인한 휴대 전화, 닉네임 없는 유저를 위한 등급
  ADMIN = '관리자',
  LEAVER = '탈퇴 유저',
  DORMANCY = '휴면 유저',
}
