export const validation = (username: string, password: string, email: string) => {
    if (username.length < 3 || username.length > 20) {
      return { ok: false, error: "Username: 영문자 3~20개를 지켜주세요" }
    }
    if (password.length < 3) {
      return {ok:false, error:"Password: 영문자 3개 이상 입력해주세요"}
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
      return {ok:false, error:"Email양식을 지켜주세요"}
    }
  }