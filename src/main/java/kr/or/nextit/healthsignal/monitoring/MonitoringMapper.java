package kr.or.nextit.healthsignal.monitoring;

import kr.or.nextit.healthsignal.healthInfo.HealthInfoVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MonitoringMapper {
    HealthInfoVO selectLatestHealthInfo(int userNo);
}
