package kr.or.nextit.healthsignal.healthInfo;

import lombok.Data;

import java.util.Date;

@Data
public class HealthInfoVO {
    float iphHeight;
    float iphWeight;
    int iphHighPressure;
    int iphLowPressure;
    Date iphDate;
    int userNo;
}
