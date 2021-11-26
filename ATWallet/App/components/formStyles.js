export const formStyles = (inputWidth) => {
    return {
        row: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignSelf: 'stretch',
        },
        input: {
            width: inputWidth || 300,
            marginTop: 16,
        },
        button: {
            marginTop: 16,
        },
    };
};
