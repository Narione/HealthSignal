package kr.or.nextit.healthsignal.notice;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface NoticeMapper {
    List<NoticeVO> selectNoticeList();
    NoticeVO selectNotice(int ntcNo);
}
