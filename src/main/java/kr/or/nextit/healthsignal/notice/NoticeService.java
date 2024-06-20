package kr.or.nextit.healthsignal.notice;

import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NoticeService {
    private final NoticeMapper noticeMapper;

    public List<NoticeVO> selectNoticeList(){
        return noticeMapper.selectNoticeList();
    };
    public NoticeVO selectNotice(int ntcNo){
        return noticeMapper.selectNotice(ntcNo);
    }
}
