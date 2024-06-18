package kr.or.nextit.healthsignal.user;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final HttpSession httpSession;

    // 로그인 후 세션에 유저 정보저장
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserVO userVO, HttpSession session) {
        UserVO loginUser = userService.login(userVO);
        if (loginUser == null) {
            return ResponseEntity.status(202).body("불일치");
        }
        if (session.getAttribute("loginUser") == null) {
            session.setAttribute("loginUser", loginUser);
            return ResponseEntity.ok().body(session.getAttribute("loginUser"));
        } else {
            return ResponseEntity.ok().body("loginFail");
        }
    }

    // 로그아웃(세션에 저장된 로그인 정보 삭제)
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.removeAttribute("loginUser");
        return ResponseEntity.ok().body("logoutSuccess");
    }

    // 아이디 중복체크
    @PostMapping("/idcheck")
    public ResponseEntity<?> idcheck(@RequestBody UserVO userVO) {
        UserVO user = userService.idCheck(userVO);
        if (user == null) {
            return ResponseEntity.ok().body("idCheckSuccess");
        } else {
            return ResponseEntity.ok().body("idCheckFail");
        }
    }

    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody UserVO userVO) {
        int result = userService.insertUser(userVO);
        if (result == 1) {
            return ResponseEntity.ok().body("signupSuccess");
        } else {
            return ResponseEntity.ok().body("signupFail");
        }
    }

    // 세션에 저장되어있는 유저 정보 가져오기
    @PostMapping("/getuserinfo")
    public ResponseEntity<?> getuserinfo() {
        UserVO loginUser = (UserVO) httpSession.getAttribute("loginUser");
        int userNo = loginUser.getUserNo();

        UserVO result = userService.getUserInfo(userNo);
        if (result == null) {
            return ResponseEntity.ok().body("getUserInfoFail");
        } else {
            return ResponseEntity.ok().body(result);
        }
    }
}
