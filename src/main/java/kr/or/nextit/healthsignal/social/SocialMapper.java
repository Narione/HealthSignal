package kr.or.nextit.healthsignal.social;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SocialMapper {
    List<SocialVO> getRankList(SocialVO socialVO);
}
