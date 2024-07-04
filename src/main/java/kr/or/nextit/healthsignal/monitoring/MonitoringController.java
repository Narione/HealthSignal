package kr.or.nextit.healthsignal.monitoring;

import kr.or.nextit.healthsignal.healthInfo.HealthInfoVO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class MonitoringController {
    private final MonitoringService monitoringService;

    @GetMapping("/latestinfo")
        public ResponseEntity<HealthInfoVO> selectLatestHealthInfo(@RequestParam("userNo") int userNo){
            HealthInfoVO result = monitoringService.selectLatestHealthInfo(userNo);
            return ResponseEntity.ok().body(result);
        }

}
