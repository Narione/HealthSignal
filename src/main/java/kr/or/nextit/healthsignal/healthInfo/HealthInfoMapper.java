package kr.or.nextit.healthsignal.healthInfo;

import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface HealthInfoMapper {

    HealthInfoVO selectHealthInfo (HealthInfoVO healthInfoVO);
    int insertHealthInfo (HealthInfoVO healthInfoVO);

}
