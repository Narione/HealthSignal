package kr.or.nextit.healthsignal.user;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    UserVO login(UserVO userVO);
    UserVO idCheck(UserVO userVO);
    int insertUser(UserVO userVO);
    UserVO getUserInfo(int userNo);
}
