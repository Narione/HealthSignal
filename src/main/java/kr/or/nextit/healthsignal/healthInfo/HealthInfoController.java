package kr.or.nextit.healthsignal.healthInfo;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class HealthInfoController {
    private final HealthInfoService healthInfoService;

    @PostMapping("/calendarcheck")
    public ResponseEntity<HealthInfoVO> calendarcheck(@RequestBody HealthInfoVO healthInfoVO) {
        HealthInfoVO result = healthInfoService.getHealthInfo(healthInfoVO);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/inserthealthinfo")
    public ResponseEntity<?> inserthealthinfo(@RequestBody HealthInfoVO healthInfoVO) {
        healthInfoService.insertHealthInfo(healthInfoVO);
        return ResponseEntity.ok().body("success");
    }
}
