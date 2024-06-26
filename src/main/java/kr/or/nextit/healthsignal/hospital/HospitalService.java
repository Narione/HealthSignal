package kr.or.nextit.healthsignal.hospital;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class HospitalService {

    private final HospitalMapper hospitalMapper;

    public List<HospitalVO> getHospitalList(HospitalVO hospitalVO) {return hospitalMapper.getHospitalList(hospitalVO);}
    public int getHospitalCnt(HospitalVO hospitalVO) {return hospitalMapper.getHospitalCnt(hospitalVO);}
}
