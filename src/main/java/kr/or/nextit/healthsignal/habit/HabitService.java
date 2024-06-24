package kr.or.nextit.healthsignal.habit;

import kr.or.nextit.healthsignal.user.UserVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HabitService {
    private final HabitMapper habitMapper;

    public List<HabitVO> selectHabitList(UserVO userVO) {
        return habitMapper.selectHabitList(userVO);
    }
    public List<HabitCheckVO> getHabitCheck(int habNo) {
        return habitMapper.getHabitCheck(habNo);
    }
    public int insertHabitCheck(HabitCheckVO habitCheckVO) {
        return habitMapper.insertHabitCheck(habitCheckVO);
    }

    public int deleteHabitCheck(HabitCheckVO habitCheckVO) {
        return habitMapper.deleteHabitCheck(habitCheckVO);
    }

    public int getHabitNo(HabitVO habitVO) {
        return habitMapper.getHabitNo(habitVO);
    }


    public int addHabit(HabitVO habitVO) { return habitMapper.addHabit(habitVO);}
    public int deleteHabit(HabitVO habitVO) { return habitMapper.deleteHabit(habitVO); }
}
