package kr.or.nextit.healthsignal.healthInfo;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class HealthInfoService {
    private final HealthInfoMapper healthInfoMapper;

    public HealthInfoVO getHealthInfo(HealthInfoVO healthInfoVO) {return healthInfoMapper.selectHealthInfo(healthInfoVO);}
    public int insertHealthInfo(HealthInfoVO healthInfoVO) {return healthInfoMapper.insertHealthInfo(healthInfoVO);}
}
