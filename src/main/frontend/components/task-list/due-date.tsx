import React, { FunctionComponent } from 'react';

type DueDateProps = {
    dueDate: string | null
}

const DueDate: FunctionComponent<DueDateProps> = ({ dueDate }) => {
    if (dueDate === null || dueDate === undefined) {
        return null;
    }

    return <span className="text-secondary ps-2">{formatDate(dueDate, navigator.language)}</span>;
};

const formatDate = (date: string, language: string) => new Intl.DateTimeFormat(
    language,
    { year: '2-digit', month: '2-digit', day: '2-digit' }
)
    .format(new Date(date));

export default DueDate;
