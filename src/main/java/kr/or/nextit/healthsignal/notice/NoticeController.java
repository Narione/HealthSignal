package kr.or.nextit.healthsignal.notice;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class NoticeController {
    private final NoticeService noticeService;

    @GetMapping("/notice/list")
    public ResponseEntity<List<NoticeVO>> noticeList() {
        List<NoticeVO> noticeList = noticeService.selectNoticeList();
        return ResponseEntity.ok().body(noticeList);
    }

    @GetMapping("/notice/view/{ntcNo}")
    public ResponseEntity<NoticeVO> noticeView(@PathVariable int ntcNo) {
        NoticeVO notice = noticeService.selectNotice(ntcNo);
        return ResponseEntity.ok().body(notice);

    }

}
