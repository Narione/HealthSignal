package kr.or.nextit.healthsignal.social;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "*")
@RequestMapping("/api")
@RequiredArgsConstructor
@RestController
public class SocialController {

    private final SocialService socialService;

    @PostMapping("/ranklist")
    public ResponseEntity<List<SocialVO>> getRankList(@RequestBody SocialVO socialVO) {
        return ResponseEntity.ok(socialService.getRankList(socialVO));
    }

}