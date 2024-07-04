package kr.or.nextit.healthsignal.monitoring;

import kr.or.nextit.healthsignal.healthInfo.HealthInfoVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MonitoringService {
    private final MonitoringMapper monitoringMapper;

    public HealthInfoVO selectLatestHealthInfo(int userNo){
        return monitoringMapper.selectLatestHealthInfo(userNo);
    }
}
