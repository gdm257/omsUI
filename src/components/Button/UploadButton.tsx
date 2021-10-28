import React, { ChangeEvent, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useSnackbar } from 'notistack';

type tProps = {
  filePath?: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      'display': 'flex',
      'alignContent': 'space-evenly',
      'alignItems': 'center',
      'justifyContent': 'space-around',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
  }),
);

export default function UploadButtons(props: tProps) {
  const { filePath = '' } = props;
  const classes = useStyles();
  const [fileInfo, setFileInfo] = useState<null | object>(null);
  const [fileName, setFileName] = useState<string>('未选择任何文件');
  const { enqueueSnackbar } = useSnackbar();

  const changeFile = (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    if (!e.target!.files[0]!.name) {
      return;
    }
    // @ts-ignore
    setFileInfo(e.target?.files[0]);
    // @ts-ignore
    setFileName(e.target?.files[0]?.name);
  };
  const uploadFile = () => {
    console.log(filePath);
    console.log(fileInfo);
    if (!filePath) {
      enqueueSnackbar('远程文件路径地址不能为空！！！', {
        autoHideDuration: 3000,
        variant: 'warning',
      });
      return;
    }
    if (!fileInfo) {
      enqueueSnackbar('请选择需要上传的文件！！！', {
        autoHideDuration: 3000,
        variant: 'warning',
      });
      return;
    }
  };
  return (
    <div className={classes.root}>
      <TextField
        size="small"
        disabled
        id="select-file"
        variant="outlined"
        value={fileName}
      />
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={(e) => changeFile(e)}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          选择文件
        </Button>
      </label>
      <Button
        variant="contained"
        startIcon={<CloudUploadIcon />}
        onClick={() => uploadFile()}
      >
        上传
      </Button>
    </div>
  );
}