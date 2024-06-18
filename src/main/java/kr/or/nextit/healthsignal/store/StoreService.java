package kr.or.nextit.healthsignal.store;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class StoreService {

    private final StoreMapper storeMapper;
    public int selectStoreCount(StoreVO storeVO) { return storeMapper.selectStoreCount(storeVO); }
    public List<StoreVO> selectStoreList(StoreVO storeVO) {
        return storeMapper.selectStoreList(storeVO);
    }
}
