package kr.or.nextit.healthsignal.qna;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RequestMapping("/api")
@RestController
@RequiredArgsConstructor

public class QnaController {
    private final QnaService qnaService;

    @GetMapping("/question/list")
    public ResponseEntity<List<QuestionVO>> selectQuestionList() {
        List<QuestionVO> questionList = qnaService.selectQuestionList();
        return ResponseEntity.ok(questionList);
    }

    @GetMapping("/question/view")
    public ResponseEntity<QuestionVO> selectQuestion(@RequestParam("queNo") int queNo) {
        QuestionVO questionVO = qnaService.selectQuestion(queNo);
        return ResponseEntity.ok(questionVO);
    }
}
