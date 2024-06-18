package kr.or.nextit.healthsignal.store;

import lombok.Data;

@Data
public class StoreVO {
    int strNo;
    String strName;
    String strLink;
    String strImg;
    String strPrice;
    String strCategory;
    int currentPage;
    int pageSize;
}
