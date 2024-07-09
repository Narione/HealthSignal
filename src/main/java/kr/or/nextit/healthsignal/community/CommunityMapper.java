package kr.or.nextit.healthsignal.community;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CommunityMapper {

    List<CommunityVO> getCommunityList();
    void addCommunity(CommunityVO vo);
}
