package kr.or.nextit.healthsignal.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserMapper userMapper;

    public UserVO login(UserVO userVO) {
        return  userMapper.login(userVO);
    }
    public UserVO idCheck(UserVO userVO) {
       return  userMapper.idCheck(userVO);
    }
    public int insertUser(UserVO userVO) {
        return userMapper.insertUser(userVO);
    }
    public UserVO getUserInfo(int userNo) {
        return userMapper.getUserInfo(userNo);
    }
}
