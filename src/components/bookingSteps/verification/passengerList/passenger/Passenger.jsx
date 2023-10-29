import  avatar  from "../../../../../assets/icons/avatar.svg";

export default function Passenger({ passenger }) {
  return (
    <div className="passenger">
      <div className="passenger__avatar">
        <img className="passenger__avatar-img" src={avatar} alt="avatar" />
        <span className="passenger__ageCategory">{passenger.ageCategory}</span>
      </div>
      <div className="passenger__info">
      <p className="passenger__name">{passenger.fullName}</p>
      <p className="passenger__gender">
        Пол {passenger.gender === "мужской" ? "мужской" : "женский"}
      </p>
      <p className="passenger__birth-date">
        Дата рождения {passenger.birthDate}
      </p>
      <p className="passenger__document">
        {passenger.documentType} {passenger.documentNumber}
      </p>
      </div>
    </div>
  );
}
