package kr.or.nextit.healthsignal.habit;

import kr.or.nextit.healthsignal.user.UserVO;
import org.apache.ibatis.annotations.Mapper;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Mapper
public interface HabitMapper {
    List<HabitVO> selectHabitList(UserVO userVO);
    List<HabitCheckVO> getHabitCheck(int habNo);
    int insertHabitCheck(HabitCheckVO habitCheckVO);
    int deleteHabitCheck(HabitCheckVO habitCheckVO);
    int getHabitNo(HabitVO habitVO);
}
