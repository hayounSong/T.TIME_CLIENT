//example
export type Favorite = {
  id: string;
  mint: string;
  choco: string;
};
export type Invite = {
  status: number;
  success: boolean;
  message: string;
  data: {
    id: number;
    teamName: string;
    teamMember: number;
    teamCode: string;
  };
};
export type TeamData = {
  teamName: string;
  teamMember: number;
  teamId: number;
  userId: number;
};
export type ChatData = {
  status: number;
  success: boolean;
  message: string;
  data: {
    id: number;
    user_Id: number;
    team_Id: number;
    is_completed: boolean;
  };
};
export type TeamScore = {
  grade: number;
  questionType: string;
};
export type TeamScoreResponse = {
  status: number;
  success: boolean;
  message: string;
  data: TeamScore[];
};
export type UserData = {
  date: string;
  teamName: string;
  nickname: string;
  result: [
    {
      questionType: string;
      grade: number;
    },
    {
      questionType: string;
      grade: number;
    },
    {
      questionType: string;
      grade: number;
    },
    {
      questionType: string;
      grade: number;
    },
    {
      questionType: string;
      grade: number;
    },
  ];
};
export type TeamDetailResult = {
  answer: string;
  grade: number;
  nickname: string;
  questionNumber: number;
  questionType: string;
};