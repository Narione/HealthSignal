package kr.or.nextit.healthsignal.user;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Objects;

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
        if (httpSession.getAttribute("loginUser") == null) {
            return ResponseEntity.ok().body("getUserInfoFail");
        }
        UserVO loginUser = (UserVO) httpSession.getAttribute("loginUser");
        int userNo = loginUser.getUserNo();

        UserVO result = userService.getUserInfo(userNo);
        return ResponseEntity.ok().body(Objects.requireNonNullElse(result, "getUserInfoFail"));
    }

    // 유저 프로필 업데이트
    @PostMapping("/update/profile")
    public ResponseEntity<?> updateprofile(@RequestBody UserVO userVO) {
        int result = userService.updateUserProfile(userVO);
        if (result == 1) {
            return ResponseEntity.ok().body("updateProfileSuccess");
        } else {
            return ResponseEntity.ok().body("updateProfileFail");
        }
    }

    // 프로필 사진 업로드
    @PostMapping("/file/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        String fileName = file.getOriginalFilename();
        String fileType = file.getContentType();

        String result = "이름은" + fileName + "타입은" + fileType;
        return ResponseEntity.ok().body(result);
    }

//    // 업로드된 프로필 사진을 서버에 저장
//    @PostMapping("/file/save")
//    public ResponseEntity<?> saveFile(@RequestParam("file") MultipartFile file) {}
}
