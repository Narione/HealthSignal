package kr.or.nextit.healthsignal.qna;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface QnaMapper {
    List<QuestionVO> selectQuestionList();
    QuestionVO selectQuestion(int queNo);
}
