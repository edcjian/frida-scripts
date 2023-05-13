import os
import sys
import pdb
import subprocess
import pexpect
import pdb


def ob(a):
    cmd = f"frida-ps -U | grep '{a}'"
    a = os.popen(cmd, 'r', 1).read()
    s = a.split(' ')[0]
    b = f"objection -g {s} explore"
    # pdb.set_trace()
    sub = subprocess.run(b, shell=True)


def frida():
    b = "adb shell"
    s = pexpect.spawn(b)
    s.expect("bullhead:*")
    s.sendline("su\n")
    s.expect("bullhead:/ #")
    s.send("cd data/local/tmp\n")
    s.expect("bullhead:/data/local/tmp #")
    s.send("./frida15.22\n")

    s.interact()


def copys(a):
    copy(a)
    os.popen(f'mkdir {a}')
    os.popen(f"adb pull sdcard/{a} ./{a}")


def copy(a):
    b = "adb shell"
    s = pexpect.spawn(b)
    s.expect("bullhead:*")
    s.sendline("su\n")
    s.expect("bullhead:/ #")
    s.send(f"mkdir sdcard/{a}\n")
    s.expect("bullhead:/ #")
    s.send(f"cd data/data/{a}\n")
    s.expect(f"bullhead:/data/data/{a} #")
    s.send(f"cp ./file/  sdcard/{a}\n")
    s.close()


def dump():
    sub = subprocess.run("frida-dex-dump", shell=True)


if __name__ == '__main__':
    func = sys.argv[1]
    args = sys.argv[2:]
    eval(func)(*args)
