import { Controller, Get, Param, Post, Body, Delete, Query, Res, HttpStatus, NotFoundException, Put, Render } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipe';

@Controller('movies')
export class MoviesController {

    constructor(private movieService: MoviesService) { }

    @Get()
    @Render('movies')
    async getMovies(@Res() res) {
        const movies = await this.movieService.getMovies();
        // return res.status(HttpStatus.OK).json(movies);
        return { movies: movies };
    }

    @Get(':movieID')
    async getMovie(@Res() res, @Param('movieID', new ValidateObjectId()) movieID) {
        const fetchedMovie = await this.movieService.getMovie(movieID);
        if (!fetchedMovie) {
            throw new NotFoundException('Movie does not exist!');
        }
        return res.status(HttpStatus.OK).json(fetchedMovie);
    }

    @Post()
    async addMovie(@Res() res, @Body() createMovieDTO: CreateMovieDTO) {
        const addedMovie = await this.movieService.addMovie(createMovieDTO);
        return res.status(HttpStatus.OK).json({
            message: "Movie has been successfully added!",
            movie: addedMovie,
        });
    }

    @Put()
    async updateMovie(
        @Res() res,
        @Query('movieID', new ValidateObjectId()) movieID,
        @Body() createMovieDTO: CreateMovieDTO) {
        const updatedMovie = await this.movieService.updateMovie(movieID, createMovieDTO);
        if (!updatedMovie) {
            throw new NotFoundException('Movie does not exist!');
        }

        return res.status(HttpStatus.OK).json({
            message: 'Movie has been successfully updated',
            movie: updatedMovie,
        })
    }

    @Delete()
    async deleteMovie(@Res() res, @Query('movieID', new ValidateObjectId()) movieID) {
        const deletedMovie = await this.movieService.deleteMovie(movieID);
        if (!deletedMovie) {
            throw new NotFoundException('Movie does not exist!');
        }

        return res.status(HttpStatus.OK).json({
            message: 'Movie has been successfully deleted!',
            movie: deletedMovie,
        });
    }
}
