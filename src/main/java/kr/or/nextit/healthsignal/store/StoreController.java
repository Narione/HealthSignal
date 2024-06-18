package kr.or.nextit.healthsignal.store;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RequestMapping("/api")
@RequiredArgsConstructor
@RestController
public class StoreController {

    private final StoreService storeService;

    @PostMapping("/storecount")
    public ResponseEntity<Integer> storeCount(@RequestBody StoreVO storeVO) {
        int cnt = storeService.selectStoreCount(storeVO);

        return ResponseEntity.ok().body(cnt);
    }

    @PostMapping("/storelist")
    public ResponseEntity<List<StoreVO>> storeList(@RequestBody StoreVO storeVO) {
        List<StoreVO> storeList = storeService.selectStoreList(storeVO);

        return ResponseEntity.ok().body(storeList);
    }
}