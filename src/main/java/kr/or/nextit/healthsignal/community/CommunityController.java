package kr.or.nextit.healthsignal.community;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class CommunityController {
    private final CommunityService service;

    @PostMapping("/getCL")
    public List<CommunityVO> getCommunityList(){
        return service.getCommunityList();
    }


    @PostMapping("/addCM")
    public void addCommunity(@RequestBody CommunityVO vo){
        System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>"+vo);
        service.addCommunity(vo);
    }
}
