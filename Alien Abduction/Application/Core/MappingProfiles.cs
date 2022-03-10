using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Quiz, Quiz>();
            CreateMap<Question, Question>();
        }
    }
}