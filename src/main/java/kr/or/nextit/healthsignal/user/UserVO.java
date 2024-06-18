package kr.or.nextit.healthsignal.user;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UserVO {
    private int userNo;
    private String userId;
    private String userPw;
    private String userName;
    private String userNickname;
    private String userGender;
    private LocalDate userBirth;
    private String userEmail;
    private String userAddress;
    private String userPhoto;
    private String userAdmin;
    private String userCity;
    private String userLiketime;
    private String userLikeactivity;
}
