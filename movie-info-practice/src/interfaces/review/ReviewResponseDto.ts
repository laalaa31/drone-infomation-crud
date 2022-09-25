import { MovieInfo } from "../movie/MovieInfo";

export interface ReviewResponseDto {
    writer: string;
    title: string;
    content: string;
    //json 형식으로 movie에 대한 모든 정보 주기
    movie: MovieInfo;
}