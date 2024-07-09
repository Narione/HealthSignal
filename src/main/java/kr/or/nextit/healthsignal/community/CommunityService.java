package kr.or.nextit.healthsignal.community;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class CommunityService {
    private final CommunityMapper mapper;

    public List<CommunityVO> getCommunityList(){return mapper.getCommunityList();}

    public void addCommunity(CommunityVO vo){
        mapper.addCommunity(vo);
    }
}
