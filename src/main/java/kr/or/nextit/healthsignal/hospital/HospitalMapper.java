package kr.or.nextit.healthsignal.hospital;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface HospitalMapper {

    List<HospitalVO> getHospitalList(HospitalVO hospitalVO);
    int getHospitalCnt(HospitalVO hospitalVO);
}
