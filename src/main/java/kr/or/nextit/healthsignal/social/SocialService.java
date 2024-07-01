package kr.or.nextit.healthsignal.social;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class SocialService {

    private final SocialMapper socialMapper;

    public List<SocialVO> getRankList(SocialVO socialVO) {return socialMapper.getRankList(socialVO);}
}
