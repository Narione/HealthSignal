package kr.or.nextit.healthsignal.hospital;

import lombok.Data;

@Data
public class HospitalVO {
    int hosNo;
    String hosName;
    String hosCategory;
    String hosCity;
    String hosAddress;
    String hosPhone;
    String hosUrl;
    int visibleCount;
    String hosFind;
}
