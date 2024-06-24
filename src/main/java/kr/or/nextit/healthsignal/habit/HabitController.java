package kr.or.nextit.healthsignal.habit;

import kr.or.nextit.healthsignal.user.UserVO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class HabitController {
    private final HabitService habitService;

    @PostMapping("/habitlist")
    public ResponseEntity<List<HabitVO>> habitList(@RequestBody UserVO userVO) {
        List<HabitVO> habitList = habitService.selectHabitList(userVO);
        return ResponseEntity.ok().body(habitList);
    }

    @GetMapping("/habitcheck")
    public ResponseEntity<List<HabitCheckVO>> habitCheck(@RequestParam("habNo") int habNo) {
        List<HabitCheckVO> habitCheckList = habitService.getHabitCheck(habNo);
        return ResponseEntity.ok().body(habitCheckList);
    }

    @PostMapping("/inserthabitcheck")
    public void insertHabitCheck(@RequestBody HabitCheckVO habitCheckVO) {
        int insertHabitCheck = habitService.insertHabitCheck(habitCheckVO);
//        return ResponseEntity.ok().body(insertHabitCheck);
    }

    @PostMapping("/deletehabitcheck")
    public void deleteHabitCheck(@RequestBody HabitCheckVO habitCheckVO) {
        int deleteHabitCheck = habitService.deleteHabitCheck(habitCheckVO);
    }

    @PostMapping("/habitno")
    public int getHabitNo(@RequestBody HabitVO habitVO){
        int selectedHabNo = habitService.getHabitNo(habitVO);
        return selectedHabNo;
    }

    @PostMapping("/addhabit")
    public int addHabit(@RequestBody HabitVO habitVO){
        int result = habitService.addHabit(habitVO);
        return result;
    }

    @PostMapping("/deletehabit")
    public int deleteHabit(@RequestBody HabitVO habitVO){
        int result = habitService.deleteHabit(habitVO);
        return result;
    }
}
