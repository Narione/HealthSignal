package kr.or.nextit.healthsignal.store;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface StoreMapper {
    int selectStoreCount(StoreVO storeVO);
    List<StoreVO> selectStoreList(StoreVO storeVO);
}
