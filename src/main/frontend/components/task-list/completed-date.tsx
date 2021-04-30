import TimeAgo from 'javascript-time-ago';
import de from 'javascript-time-ago/locale/de';
import en from 'javascript-time-ago/locale/en';
import React, { FunctionComponent } from 'react';

type CompletedDateProps = {
    completedDate: string | null
}

const CompletedDate: FunctionComponent<CompletedDateProps> = ({ completedDate }) => {
    if (completedDate === null || completedDate === undefined) {
        return null;
    }

    return <span className="text-secondary ps-2">{formatDate(completedDate, navigator.language)}</span>;
};

try {
    // TimeAgo throws an exception when this is executed more than once
    // which happens when using Next.js' development mode
    TimeAgo.addLocale(de);
    TimeAgo.addDefaultLocale(en);
    // eslint-disable-next-line no-empty
} catch (_) { }

const formatDate = (date: string, language: string) => new TimeAgo(language).format(new Date(date));

export default CompletedDate;
