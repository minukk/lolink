const url = 'http://localhost:3000';
let token = '';

describe('My First Test', () => {
  it('메인 페이지 방문', () => {
    cy.visit(`${url}`);
    cy.contains('LoLink');

    cy.contains('커뮤니티');
    cy.contains('중고 거래');
    cy.contains('지금 여러분의');
    cy.contains('주변과 LINK하세요!');
  });

  it('로그인 페이지 이동 후 로그인, 로그인 성공 후 메인 페이지 이동', () => {
    cy.visit(`${url}`);
    cy.contains('LoLink')

    cy.get('[aria-label="메뉴 드롭 아이콘"]').click();
    cy.get('[aria-label="로그인 이동"]').click();

    cy.contains('로그인');
    
    cy.get('[aria-label="메뉴 드롭 아이콘"]').click();
    
    cy.get('[placeholder=이메일]');
    cy.get('[placeholder=비밀번호]');
    cy.get('[aria-label="이메일 입력"]').type('test1@test.com');
    cy.get('[aria-label="비밀번호 입력"]').type('12341234');
    cy.get('[aria-label="로그인"]').click();

    cy.window().then((window) => {
      token = window.sessionStorage.getItem('lolink') as string; // 토큰 저장
    });

    cy.contains('로그인 되었습니다.');
  });

  it('로그인 성공 후, 커뮤니티 페이지 이동, 상위 게시글 클릭, 추천 버튼 클릭, 댓글 작성.', () => {
    cy.visit(`${url}`);
    cy.get('[aria-label="커뮤니티 페이지 이동"]').click();

    cy.contains('커뮤니티');
    cy.contains('글쓰기');
    cy.contains('인기글');
    cy.contains('최신글');

    cy.get('[aria-label="글쓰기"]');
    
    cy.get('ul').find('li').eq(1).click();
    cy.get('button').contains('추천').click();
    cy.get('[aria-label=댓글입력]').type('댓글 테스트');
    cy.get('button').contains('확인').click();
  });

  it ('커뮤니티 페이지 이동, 글 작성, 글 수정, 글 삭제', () => {
    cy.visit(`${url}`);
    cy.get('[aria-label="커뮤니티 페이지 이동"]').click();
    cy.visit(`${url}/posts/write`);

    cy.contains('게시글 글쓰기');
    cy.get('[aria-label="제목 입력"]').type('글 작성 테스트');
    cy.get('.ql-editor').type('글 내용 테스트');
    cy.get('[aria-label="해시태그 입력"]').type('해시태그 테스트{enter}');

    cy.get('button').contains('글등록').click(); 
  });

  it('메인 페이지 이동, 상품 페이지 클릭', () => {
    cy.visit(`${url}`) 
    cy.get('[aria-label="중고 거래 페이지 이동"]').click();

    cy.contains('인기 물품');
    cy.contains('우리 지역 중고거래');

    
    cy.get('ul').find('li').eq(6).click();
    cy.get('button').contains('좋아요').click();
  });

  it ('중고 거래 페이지 이동, 글 작성, 글 수정, 글 삭제', () => {
    cy.visit(`${url}`);
    
    cy.get('[aria-label="중고 거래 페이지 이동"]').click();
    cy.visit(`${url}/products/write`);

    cy.get('[aria-label="제목 입력"]').type('글 작성 테스트');
    cy.get('.ql-editor').type('글 내용 테스트');
    cy.get('[aria-label="해시태그 입력"]').type('해시태그 테스트${enter}');
    cy.get('[aria-label="이미지 업로드"]');
    cy.get('[aria-label="지역 선택"]').type('서울');
    cy.get('[aria-label="상세 지역 선택"]').type('강북구');
    cy.get('[aria-label="가격 입력"]').type('10000');
    cy.get('[aria-label="해시태그 입력"]').type('해시태그 테스트');

    cy.get('button').contains('상품등록').click(); 
  });
})
