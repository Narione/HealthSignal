package kr.or.nextit.healthsignal.hospital;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RequestMapping("/api")
@RequiredArgsConstructor
@RestController
public class HospitalController {

    private final HospitalService hospitalService;

    @PostMapping("/hoslist")
    public ResponseEntity<List<HospitalVO>> hosList(@RequestBody HospitalVO hospitalVO) {
        List<HospitalVO> hospitalList = hospitalService.getHospitalList(hospitalVO);
        return ResponseEntity.ok(hospitalList);
    }

    @PostMapping("/hoscount")
    public ResponseEntity<Integer> hosCount(@RequestBody HospitalVO hospitalVO) {
        int hospitalCnt = hospitalService.getHospitalCnt(hospitalVO);
        return ResponseEntity.ok(hospitalCnt);
    }
}