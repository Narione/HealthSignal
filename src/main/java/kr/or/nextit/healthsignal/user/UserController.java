package kr.or.nextit.healthsignal.user;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;
import java.util.UUID;

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
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) throws IOException {

        String originalFilename = file.getOriginalFilename();
        String extension = "";
        int dotIndex = originalFilename.lastIndexOf('.');
        if (dotIndex > 0) {
            extension = originalFilename.substring(dotIndex);
        }
        String uniqueFilename = UUID.randomUUID().toString() + extension;

        String filePath = System.getProperty("user.dir") + "\\src\\main\\HealthSignal\\public\\images\\profile";
        File saveFile = new File(filePath, uniqueFilename);
        file.transferTo(saveFile);

        // 서버에 파일 저장하고 고유 파일이름 응답
        return ResponseEntity.ok().body(uniqueFilename);
    }

    // 기존 프로필 사진 삭제
    @PostMapping("file/delete")
    public ResponseEntity<?> deleteFile(@RequestBody String userPhoto) {
        String filePath = System.getProperty("user.dir") + "\\src\\main\\HealthSignal\\public\\images\\profile\\";
        File file = new File(filePath + userPhoto.substring(0, userPhoto.length() -1));
        boolean delete = file.delete();

        return ResponseEntity.ok().body("deleteSuccess");
    }

    // 비밀번호 변경
    @PostMapping("update/password")
    public ResponseEntity<?> updatePassword(@RequestBody UserVO userVO) {
        int result = userService.updateUserPw(userVO);
        if (result == 1) {
            return ResponseEntity.ok().body("updatePasswordSuccess");
        } else {
            return ResponseEntity.ok().body("updatePasswordFail");
        }
    }
}
