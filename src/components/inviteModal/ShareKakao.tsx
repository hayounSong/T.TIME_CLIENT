export const shareKakao = (route: string, teamName: string, shareType: string) => {
  if (window.Kakao) {
    const kakao = window.Kakao;
    if (!kakao.isInitialized()) {
      kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    }

    if (shareType == '개인결과') {
      kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: `‘${teamName}’팀 초대장이 도착했어요!`,
          description: '초대장을 열고, 티타임에 입장해보세요.☕️',

          imageUrl: process.env.NEXT_PUBLIC_KAKAO_SHARE_IMAGE,
          link: {
            mobileWebUrl: route,
            webUrl: route,
          },
        },
        buttons: [
          {
            title: '자세히 보기',
            link: {
              mobileWebUrl: route,
              webUrl: route,
            },
          },
        ],
      });
    }
  }
};
